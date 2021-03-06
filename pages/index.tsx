import {ResourceList, Resource} from '../types'
// import styles from '../styles/Home.module.css'
import fs from 'fs'
import YAML from 'yaml'
import { Component } from 'react'

type Props = {
  data: ResourceList
}

type State = {
  search: string
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const file = fs.readFileSync('./resources.yml', 'utf8')
  const data: ResourceList = YAML.parse(file)
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {data: data}
  }
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      search: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({search: e.currentTarget.value})
  }

  render () {
    const {props, state} = this 
    // TODO: Add auto-generated modal/link when "Learn More is clicked"
    const cleanSearch = state.search.trim().toLowerCase()
    const filteredData = props.data.filter(x =>
      x.title.toLowerCase().indexOf(cleanSearch) !== -1 ||
      x.source.toLowerCase().indexOf(cleanSearch) !== -1
)
    const list = filteredData.map((x, i) => (
      <div className="col-md-4">
        <div key={i} className="card">
          <div className="card-img">
            <img src={x.img} style={{width: "100%"}} />
          </div>
          <div className="card-body">
            <h3>{x.title}</h3>
            <h4>{x.source}</h4>
            <p>Designed for {x.target.join(', ')}</p>
            <p>{x.tagline}</p>
            <a href="#" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </div>
    ))
    //TODO: Add search with tag:x,y,z
    return (
      <main className="container">
        <h1 className="display-3 my-3">Computing Resources for Schools</h1>
        <div className="row mb-4">
          <div className="col-12">
            <input
              type="text"
              placeholder="Search by title or source..."
              className="form-control form-control-lg"
              onChange={this.handleChange}
              value={state.search} />
          </div>
        </div>
        <div className="row">
            {list}
        </div>
      </main>
    )
  }
}