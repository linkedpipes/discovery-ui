import React from 'react'
import { map, compose } from 'ramda'
import ApplicationGroup from './applicationGroup'

const PipelineGroups = ({ pipelineGroups, discoveryId }) => (
    <div>
        <br />
        {compose(
            map(applicationGroup => (
                <div>
                    <ApplicationGroup
                        key={applicationGroup.applicationInstance.uri}
                        applicationGroup={applicationGroup}
                        discoveryId={discoveryId}
                    />
                    <br/>
                </div>
            ))
        )(pipelineGroups.applicationGroups)}
    </div>
)


export default PipelineGroups
