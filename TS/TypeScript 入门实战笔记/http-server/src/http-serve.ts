/// <reference path="../typings/ecstatic/index.d.ts" />
/**
 * @description 简单的静态文件服务器
 */
import http from 'http'
import ecstatic from 'ecstatic'

export interface IHttpServerOptions {
  root?: string
  cache?: number
}

export interface IHttpServer {
  listen(port: number): void
  close(): void
}

export default class HttpServer implements IHttpServer {
  private server: http.Server

  constructor(options: IHttpServerOptions) {
    const root = options.root || process.cwd()
    this.server = http.createServer(
      ecstatic({
        root: root,
        cache: options.cache === undefined ? 3600 : options.cache,
        showDir: true,
        defaultExt: 'html',
        gzip: true,
        contentType: 'application/octet-stream',
      }),
    )
  }
  public listen(port: number): void {
    this.server.listen(port)
  }
  public close(): void {
    this.server.close()
  }
}
