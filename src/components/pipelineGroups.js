import React from 'react'
import { map, compose } from 'ramda'
import ApplicationGroup from './applicationGroup'

const PipelineGroups = ({ pipelineGroups, discoveryId }) => (
    <div>
        <br />
        {compose(
            map(applicationGroup => (
                <ApplicationGroup
                    key={applicationGroup.applicationInstance.uri}
                    applicationGroup={applicationGroup}
                    discoveryId={discoveryId}
                />
            ))
        )(pipelineGroups.applicationGroups)}
    </div>
)


export default PipelineGroups
