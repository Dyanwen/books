import { isString, objForEach, aryForEach, isNotEmptyObj } from "./util";
import { REPLACE, REORDER, PROPS, TEXT } from "./common";
import listDiff from "list-diff2";

/**
 *
 * @param {旧Dom树} oTree
 * @param {新Dom树} nTree
 * 返回差异记录
 */
function diff(oTree, nTree) {
    // 节点位置
    let index = 0;
    // 差异记录
    const patches = {};
    dfsWalk(oTree, nTree, index, patches);
    return patches;
}

function dfsWalk(oNode, nNode, index, patches) {
    const currentPatch = [];

    // 首次渲染
    if (nNode === null) return;

    // 都是字符串形式并且不相同直接替换文字
    if (isString(oNode) && isString(nNode)) {
        oNode !== nNode &&
            currentPatch.push({
                type: TEXT,
                content: nNode
            });
        // 同种标签并且key相同
    } else if (oNode.tagName === nNode.tagName && oNode.key === nNode.key) {
        // 至少一方有值
        if (isNotEmptyObj(oNode.props) || isNotEmptyObj(nNode.props)) {
            // 计算props结果
            const propsPatches = diffProps(oNode, nNode);
            // 有差异则重新排序
            propsPatches &&
                currentPatch.push({
                    type: PROPS,
                    props: propsPatches
                });
        }
        // children对比
        if (
            !(!isNotEmptyObj(nNode.props) && nNode.props.hasOwnProperty("ignore"))
        ) {
            (oNode.children.length || nNode.children.length) &&
                diffChildren(
                    oNode.children,
                    nNode.children,
                    index,
                    patches,
                    currentPatch
                );
        }
    } else {
        // 都不符合上面情况就直接替换
        currentPatch.push({ type: REPLACE, node: nNode });
    }

    // 最终对比结果
    currentPatch.length && (patches[index] = currentPatch);
}