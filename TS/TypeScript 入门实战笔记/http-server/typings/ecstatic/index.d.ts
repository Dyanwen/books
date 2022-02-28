declare module 'ecstatic' {
  export default (options?: {
    root?: string
    baseDir?: string
    autoIndex?: boolean
    showDir?: boolean
    showDotfiles?: boolean
    humanReadable?: boolean
    hidePermissions?: boolean
    si?: boolean
    cache?: string | number
    cors?: boolean
    gzip?: boolean
    brotli?: boolean
    defaultExt?: 'html' | (string & {})
    handleError?: boolean
    serverHeader?: boolean
    contentType?: 'application/octet-stream' | (string & {})
    weakEtags?: boolean
    weakCompare?: boolean
    handleOptionsMethod?: boolean
  }) => any
}
