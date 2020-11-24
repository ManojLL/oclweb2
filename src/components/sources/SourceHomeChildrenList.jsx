import React from 'react';
import Search from '../search/Search';
import VersionFilter from '../common/VersionFilter';
import { map, includes } from 'lodash';

class SourceHomeChildrenList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVersion: this.props.currentVersion || 'HEAD'
    }
  }

  getURL() {
    const { selectedVersion } = this.state;
    const { versionedObjectURL, resource } = this.props;
    let url = versionedObjectURL;
    if(selectedVersion && !includes(['HEAD', 'concepts', 'mappings', 'about', 'versions'], selectedVersion))
      url += `${selectedVersion}/`
    url += `${resource}/`

    return url
  }

  onChange = version => {
    this.setState({selectedVersion: version || 'HEAD'})
  }

  getExtraControls() {
    const { selectedVersion } = this.state;
    const { versions } = this.props;
    return (
      <VersionFilter
        size='small'
        onChange={this.onChange}
        versions={map(versions, 'id')}
        selected={selectedVersion}
      />
    )
  }

  render() {
    return (
      <Search
        {...this.props}
        nested={true}
        baseURL={this.getURL()}
        fixedFilters={{isTable: true, limit: 25}}
        extraControls={this.getExtraControls()}
      />
    )
  }
}

export default SourceHomeChildrenList;
