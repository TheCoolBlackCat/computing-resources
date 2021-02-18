type Platform = (
    "Web" |
    "Windows" |
    "macOS" |
    "Linux" |
    "iOS" |
    "Android" |
    "micro:bit" |
    "Raspberry Pi" |
    "Arduino"
)

type Target = (
    "teachers" |
    "adults" |
    "university" |
    "pre-school" |
    "early primary" |
    "late primary" |
    "early secondary" |
    "GCSE" |
    "A-Level"
)

type Resource = {
    uuid: string
    title: string
    link: string
    img: string
    author: string
    source: string
    tagline: string
    description: string
    platforms: Platform[]
    targets: Target[]
    tags: string[]
}

type ResourceList = Array<Resource>

export type {Platform, Target, Resource, ResourceList}