type Resource = {
    uuid: string
    title: string
    link: string
    img: string
    author: string
    source: string
    tagline: string
    description: string
    platforms: string[]
    target: string[]
    tags: string[]
}

type ResourceList = Array<Resource>

export type {Resource, ResourceList}