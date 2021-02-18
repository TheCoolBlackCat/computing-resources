import {getData} from '../utils'
import Link from 'next/link'
import {Resource, Platform, Target} from '../../types'

type Props = {
    res: Resource
}

function getPlatformIcon(platform: Platform) {
    const icons: Map<Platform, string> = new Map()
    icons.set("Android", "fab fa-android")
    icons.set("iOS", "fab fa-app-store-ios")
    icons.set("Web", "fas fa-globe")
    icons.set("YouTube", "fab fa-youtube")
    icons.set("Windows", "fab fa-windows")
    icons.set("macOS", "fab fa-apple")
    icons.set("Linux", "fab fa-linux")
    icons.set("Raspberry Pi", "fab fa-raspberry-pi")
    const microchip = "fas fa-microchip"
    icons.set("Arduino", microchip)
    icons.set("micro:bit", microchip)
    return icons.get(platform) || "fa fa-code"
}

export default function resource(props: Props) {
    const {title, link, img, author, source, description, targets: target, platforms, tags} = props.res
    const tagsList = tags.map((tag, i) => <span key={i} className="badge rounded-pill bg-info text-light">{tag}</span>)
    const targetList = "Suitable for: " + target.join(', ')
    const platformList = platforms.map((platform, i) => (
        <div key={i} className="list-group-item list-group-item-action">
            <i className={getPlatformIcon(platform)} aria-hidden="true"></i>
            {platform}
        </div>
    ))
    return (
        <main className="container">
            <div className="resource">
                <h2 className="display-4">
                    <Link href={link}>
                        <a>{title}</a>
                    </Link>
                </h2>
                <h4><strong>{author}</strong>{source === author || ` | Submitted by ${source}`}</h4>
                <img
                    src={img}
                    className="img-fluid"
                    alt="" />
                <p>{description}</p>
                <p className="text-muted">{targetList}</p>
                {target.join}
                <div className="platforms list-group">
                    {platformList}
                </div>
                <div className="tags">
                    {tagsList}
                </div>
                <Link href={link}>
                        <a className="btn btn-primary">Visit Resource</a>
                    </Link>
                <Link href="/">
                    <a className="btn btn-secondary">Back Home</a>
                </Link>
            </div>
        </main>
    )
}

export async function getStaticPaths() {
    // Return a list of possible value for uuid
    const data = getData()
    const paths = data.map(x => ({
        params: {
            uuid: x.uuid
        }
    }))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.uuid

    const data = getData()
    const item: Resource = data.filter(x => x.uuid === params.uuid)[0]
    return {
        props: {
            res: item
        }
    }
}