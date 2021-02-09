import React from 'react';
import { Link } from 'react-router-dom'
import { Tooltip } from '@material-ui/core';
import {
  Person as PersonIcon,
  List as ListIcon,
  Loyalty as LoyaltyIcon,
  Home as HomeIcon,
} from '@material-ui/icons'
import { merge, get } from 'lodash'
import { DARKGRAY } from '../../common/constants';
import LastUpdatedOnLabel from '../common/LastUpdatedOnLabel';
import LocationLabel from '../common/LocationLabel';

const TAG_ICON_STYLES = {width: '12px', marginRight: '4px', marginTop: '2px'}
const User = props => {
  return (
    <div className='col-sm-12' style={merge({paddingTop: '10px', paddingLeft: 0, paddingRight: 0}, get(props, 'style', {}))}>
      <div className="col-sm-9 no-left-padding">
        <Link to={props.url} style={{display: 'inline-block'}} target="_blank">
          <div className='col-sm-12 no-side-padding'>
            <span className='resource-label ellipsis-text' style={{maxWidth: '100%'}}>
              <span style={{paddingTop: '5px'}}>
                <PersonIcon fontSize='small' style={{width: '10pt', color: DARKGRAY}}/>
              </span>
              <span className='resource-name ellipsis-text-3' style={{maxWidth: '100%'}}>
                {props.username}
              </span>
            </span>
            <span className='resource-label resource-id user-bg' style={{maxWidth: '100%'}}>
              <span className='ellipsis-text'>{props.name}</span>
            </span>
          </div>
        </Link>
        <div className='col-sm-12 no-side-padding resource-attributes'>
          {
            props.company &&
            <React.Fragment>
              <span className='resource-attr'>Company:</span>
              <span className='resource-value'>{props.company}</span>
            </React.Fragment>
          }
        </div>
        <div className='col-sm-12 no-side-padding'>
          {
            props.location &&
            <span style={{marginRight: '10px'}}>
              <LocationLabel location={props.location} noContainerClass iconSize="small" />
            </span>
          }
          <LastUpdatedOnLabel
            label='Created'
            date={props.created_on}
            by={props.created_by}
            iconSize='small'
            noContainerClass
          />
        </div>
      </div>
      <div className="col-sm-3" style={{textAlign: 'right'}}>
        <Link to={props.organizations_url} target='_blank'>
          <Tooltip title='Organization Memberships'>
            <span className='flex-vertical-center' style={{paddingRight: '20px', fontSize: '14px',}}>
              <HomeIcon fontSize='small' style={TAG_ICON_STYLES} />
              {props.orgs}
            </span>
          </Tooltip>
        </Link>
        <Link to={props.sources_url} target='_blank'>
          <Tooltip title='Sources'>
            <span className='flex-vertical-center' style={{paddingRight: '20px', fontSize: '14px',}}>
              <ListIcon fontSize='small' style={TAG_ICON_STYLES} />
              {props.public_sources}
            </span>
          </Tooltip>
        </Link>
        <Link to={props.collections_url} target='_blank'>
          <Tooltip title='Collections'>
            <span className='flex-vertical-center' style={{paddingRight: '20px', fontSize: '14px',}}>
              <LoyaltyIcon fontSize='small' style={TAG_ICON_STYLES} />
              {props.public_collections}
            </span>
          </Tooltip>
        </Link>
      </div>
    </div>
  )
}

export default User;
