import {ResourceList, Resource} from '../types'
// import styles from '../styles/Home.module.css'

import { Component } from 'react'
import {getData} from './utils'

type Props = {
  data: ResourceList
}

type State = {
  search: string
}

export async function getStaticProps() {
  return {
    props: {data: getData()}
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
    // TODO: This should probably be de-bounced
  }

  render () {
    const {props, state} = this 
    // TODO: Add auto-generated modal/link when "Learn More is clicked"
    const cleanSearch = state.search.trim().toLowerCase()
    const filteredData = props.data.filter(x => {
      return x.title.toLowerCase().indexOf(cleanSearch) !== -1 ||
      x.author.toLowerCase().indexOf(cleanSearch) !== -1 ||
      x.tagline.toLowerCase().indexOf(cleanSearch) !== -1
    })
    const list = filteredData.map(x => (
      <div className="col-md-4">
        <div key={x.uuid} className="card">
          <div className="card-img">
            <img src={x.img} style={{width: "100%"}} />
          </div>
          <div className="card-body">
            <h3>{x.title}</h3>
            <h4>{x.author}</h4>
            <p>Designed for {x.targets.join(', ')}</p>
            <p>{x.tagline}</p>
            <div className="tags">
              {x.tags.map((tag, i) => <span key={i} className="badge rounded-pill bg-info text-light">{tag}</span>)}
            </div>
            <a href={`/resource/${x.uuid}`} className="btn btn-secondary">Learn More</a>
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