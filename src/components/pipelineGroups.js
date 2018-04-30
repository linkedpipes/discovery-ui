import React from 'react'
import { map, compose } from 'ramda'
import ApplicationGroup from './applicationGroup'

const PipelineGroups = ({ pipelineGroups, discoveryId }) => (
    <div key={discoveryId}>
        <br />
        {compose(
            map(applicationGroup => (
                <div
                    key={applicationGroup.applicationInstance.uri}>
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
