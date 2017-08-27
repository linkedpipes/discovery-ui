import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-md/lib/Buttons/Button'
import fetch from 'isomorphic-fetch'
import { onPipelineExported } from '../actions/actions'


const DataSampleGroup = ({ dataSampleGroup, discoveryId, exportPipeline }) => (
    <li key={dataSampleGroup.pipeline.id}>
        <span>Minimal iteration: {dataSampleGroup.minimalIteration}</span>
        <div>
            {dataSampleGroup.pipeline.descriptor}
        </div>
        <Button flat label='Export' onClick={() => exportPipeline(discoveryId, dataSampleGroup.pipeline.id)} />
    </li>
)

const exportPipeline = (discoveryId, pipelineId) => {
    return dispatch => {
        return fetch(`${BACKEND_URL}/discovery/${discoveryId}/execute/${pipelineId}`).then(
            success => dispatch(onPipelineExported(discoveryId, pipelineId)),
            error => {}
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
    return {
        exportPipeline: (discoveryId, pipelineId) => dispatch(exportPipeline(discoveryId, pipelineId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSampleGroup)
