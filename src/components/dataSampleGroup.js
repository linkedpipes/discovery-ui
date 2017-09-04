import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-md/lib/Buttons/Button'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
import { exportPipeline } from '../actions/actions'


const DataSampleGroup = ({ dataSampleGroup, discoveryId, exportPipeline, pipelineData }) => (
    <li>
        <span>Minimal iteration: {dataSampleGroup.minimalIteration}</span>
        <div>
            {dataSampleGroup.pipeline.descriptor}
        </div>
        {(!pipelineData[dataSampleGroup.pipeline.id] || (!pipelineData[dataSampleGroup.pipeline.id].isRunning && !pipelineData[dataSampleGroup.pipeline.id].isSuccess))  ?
            <Button flat label='Export' onClick={() => exportPipeline(discoveryId, dataSampleGroup.pipeline.id)} /> :
            null
        }

        {(pipelineData[dataSampleGroup.pipeline.id] && pipelineData[dataSampleGroup.pipeline.id].isRunning && !pipelineData[dataSampleGroup.pipeline.id].isSuccess) ?
            <CircularProgress key={`progress_pipeline_${dataSampleGroup.pipeline.id}`} id={`progress_pipeline_${dataSampleGroup.pipeline.id}`} /> :
            null
        }

        {(pipelineData[dataSampleGroup.pipeline.id] && !pipelineData[dataSampleGroup.pipeline.id].isRunning && pipelineData[dataSampleGroup.pipeline.id].isSuccess) ?
            <span>Done</span> :
            null
        }
    </li>
)

const mapStateToProps = state => ({pipelineData: state.discovery.pipelineData})

const mapDispatchToProps = dispatch => {
    return {
        exportPipeline: (discoveryId, pipelineId) => dispatch(exportPipeline(discoveryId, pipelineId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSampleGroup)
