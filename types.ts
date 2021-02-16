type Resource = {
    title: string
    link: string
    img: string
    source: string
    tagline: string
    purpose: string
    target: string[]
    tags: string[]
}
  
type ResourceList = Array<Resource>

export type {Resource, ResourceList}