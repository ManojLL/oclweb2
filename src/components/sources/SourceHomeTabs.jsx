import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { get } from 'lodash';
import { currentUserHasAccess } from '../../common/utils';
import ConceptContainerVersionList from '../common/ConceptContainerVersionList';
import SourceHomeChildrenList from './SourceHomeChildrenList';
import AboutAccordian from '../common/AboutAccordian';
import NewResourceButton from '../common/NewResourceButton';
import CommonFormDrawer from '../common/CommonFormDrawer';
import ConceptForm from '../concepts/ConceptForm';
import MappingForm from '../mappings/MappingForm';

const SourceHomeTabs = props => {
  const {
    tab, onChange, source, versions, location, versionedObjectURL, currentVersion,
    aboutTab
  } = props;
  const about = get(source, 'extras.about')
  const [conceptForm, setConceptForm] = React.useState(false);
  const [mappingForm, setMappingForm] = React.useState(false);

  const onNewClick = resource => {
    if(resource === 'concept')
      setConceptForm(true)
    if(resource === 'mapping')
      setMappingForm(true)
  }

  const hasAccess = currentUserHasAccess()
  return (
    <div className='col-md-12 sub-tab'>
      <Tabs className='sub-tab-header col-md-8 no-side-padding' value={tab} onChange={onChange} aria-label="source-home-tabs" classes={{indicator: 'hidden'}}>
        <Tab label="Concepts" />
        <Tab label="Mappings" />
        <Tab label="Versions" />
        {aboutTab && <Tab label="About" />}
      </Tabs>
      {
        hasAccess &&
        <div className='col-md-4 no-right-padding' style={{textAlign: 'right'}}>
          <NewResourceButton onClick={onNewClick} />
        </div>
      }
      <div className='sub-tab-container' style={{display: 'flex', minHeight: '500px', width: '100%'}}>
        {
          tab === 0 &&
          <SourceHomeChildrenList
            source={source}
            location={location}
            versionedObjectURL={versionedObjectURL}
            versions={versions}
            currentVersion={currentVersion}
            resource='concepts'
          />
        }
        {
          tab === 1 &&
          <SourceHomeChildrenList
            source={source}
            location={location}
            versionedObjectURL={versionedObjectURL}
            versions={versions}
            currentVersion={currentVersion}
            resource='mappings'
          />
        }
        {
          tab === 2 &&
          <ConceptContainerVersionList versions={versions} resource='source' />
        }
        {
          aboutTab && tab === 3 &&
          <AboutAccordian id={source.id} about={about} />
        }
      </div>
      <CommonFormDrawer
        isOpen={conceptForm}
        onClose={() => setConceptForm(false)}
        formComponent={
          <ConceptForm onCancel={() => setConceptForm(false)} reloadOnSuccess={tab==0} parentURL={versionedObjectURL} />
        }
      />
      <CommonFormDrawer
        isOpen={mappingForm}
        onClose={() => setMappingForm(false)}
        formComponent={
          <MappingForm onCancel={() => setMappingForm(false)} reloadOnSuccess={tab==1} parentURL={versionedObjectURL} />
        }
      />
    </div>
  );
}

export default SourceHomeTabs;
