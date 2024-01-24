export default interface IJsonApiObject {
    meta?: {[key:string]: any},
    included?: Array<any>,
    errors?: Array<string>,
}
