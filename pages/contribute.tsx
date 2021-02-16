import { Component, ChangeEvent, FormEvent } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'

type FormChangeEvent = ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>
// type FormSubmitEvent = FormEvent<HTMLFormElement

type TextInputProps = {
    name: string
    label: string
    valid: boolean
    invalidFeedback: string
    help?: string
    placeholder: string
    value: string
    required?: true
    type?: string
    onChange: (e: FormChangeEvent) => void
}

function TextInput(props: TextInputProps) {
    const {name, label, valid, help, placeholder, required, invalidFeedback, type, onChange, value} = props
    const id = `${name}Input`
    const helpId = `${id}Help`
    const validClass = !valid ? "is-invalid" : ""
    const defaultType = "text"
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label fw-normal">{label}</label>
            <input
                type={defaultType || type}
                className={`form-control ${validClass}`}
                id={id} name={name}
                aria-describedby={helpId}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                required={required} />
            {help && 
            <div id={helpId} className="form-text text-muted fs-6 fw-light">
                {help}
            </div>}
            <div className="invalid-feedback">
                {invalidFeedback}
            </div>
        </div>)
}

type Props = {}

type FormValues = {
    title: string
    link: string
    img: string
    source: string
    tagline: string 
    purpose: string
    target: string
    tags: string
}

type State = {
    out: string
    values: FormValues
}

export default class Contribute extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            out: "",
            values: {
                title: "",
                link: "",
                img: "",
                source: "",
                tagline: "",
                purpose: "",
                target: "",
                tags: ""
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const values = this.state.values
        this.setState({values: {...values, [e.currentTarget.name]: e.currentTarget.value} as FormValues})
    }

    handleSubmit(e) {
        e.preventDefault()
        const {title, link, img, source, tagline, purpose, target, tags} = this.state.values

        //TODO: Validate URLS - link, img
        //TODO: Validate title, link, img, source, tagline present
        //TODO: Validate tagline < 160 chars

        let targetA = [""]
        if (target) {
            targetA = [...targetA, ...target.split(',').map(s => s.trim())]
        }
        const targetList = targetA.length > 1 ? ("\n\ttarget: " + targetA.join("\n\t\t- ")) : ""

        let tagsA = [""]
        if (tags) {
            tagsA = [...tagsA, ...tags.split(',').map(s => s.trim())]
        }
        const tagsList = tagsA.length > 1 ? ("\n\ttags: " + tagsA.join("\n\t\t- ")) : ""

        // FIXME: Use the YAML library
        this.setState({out: `- title: ${title} \n\tlink: ${link} \n\timg: ${img} \n\tsource: ${source} \n\ttagline: ${tagline} \n\tpurpose: ${purpose} ${targetList} ${tagsList} \n`})
    }

    render () {
        const {out, values} = this.state
        return (
            <main className="container">
                <h1>Contribute a Resource</h1>
                <form onSubmit={this.handleSubmit}>
                    <TextInput
                        name="title"
                        label="Title"
                        required
                        valid={true}
                        invalidFeedback="No title was specified"
                        value={values.title}
                        placeholder="My Awesome Resource"
                        onChange={this.handleChange} />
                    <TextInput
                        name="link"
                        label="Link"
                        required
                        help="Link to the resource"
                        // type="url"
                        valid={true}
                        invalidFeedback="You did not specify a valid URL"
                        value={values.link}
                        placeholder="https://www.my-website.co.uk"
                        onChange={this.handleChange} />
                    <TextInput
                        name="img"
                        label="Image URL"
                        help="URL to a banner image"
                        // type="url"
                        valid={true}
                        invalidFeedback="You did not specify a valid image URL"
                        value={values.img}
                        placeholder="https://www.my-website.co.uk/image.jpg"
                        onChange={this.handleChange} />
                    <TextInput
                        name="source"
                        label="Source"
                        required
                        valid={true}
                        invalidFeedback="You did not specify a source"
                        value={values.source}
                        placeholder="David, MyCompany Ltd, etc."
                        onChange={this.handleChange} />
                    <TextInput
                        name="tagline"
                        label="Tagline"
                        required
                        valid={true}
                        invalidFeedback="The tagline needs to be at most 160 characters"
                        value={values.tagline}
                        placeholder="A really cool computer science blog!"
                        help="A brief description of this resource for the main index"
                        onChange={this.handleChange} />
                    <TextInput
                        name="purpose"
                        label="Purpose"
                        valid={true}
                        invalidFeedback="Invalid Input!"
                        value={values.purpose}
                        placeholder="Personal blog with lots of useful articles, Online tutorial, etc."
                        onChange={this.handleChange} /> 
                    <TextInput
                        name="target"
                        label="Target Audience"
                        required
                        valid={true}
                        invalidFeedback="Invalid Input!"
                        value={values.target}
                        placeholder="8-12 year olds, University Students, Teachers, ..."
                        onChange={this.handleChange} />
                    <TextInput
                        name="tags"
                        label="Tags"
                        valid={true}
                        invalidFeedback="Invalid Input!"
                        value={values.tags}
                        placeholder="website, cool, awesome, ..."
                        onChange={this.handleChange} />
                    <button type="submit" className="btn btn-primary">Generate</button>
                </form>

                {out && (
                <div>
                    <CopyToClipboard text={out}>
                        <button className="btn btn-secondary">Copy this YAML</button>
                    </CopyToClipboard>
                    <a className="btn btn-success" href="https://github.com/TheCoolBlackCat/computing-resources/edit/main/resources.yml">Append to file</a>
                </div>)}
                
                <pre>
                    {out}
                </pre>
            </main>
        )
    }
}