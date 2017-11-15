import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-md/lib/Buttons/Button'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
import OutputDataSamplePreview from '../components/outputDataSamplePreview'
import { exportPipeline, showDataSample } from '../actions/actions'


const DataSampleGroup = ({ dataSampleGroup, discoveryId, exportPipeline, pipelineData, applicationExecutorIri }) => (
    <li>
        <span>Minimal iteration: {dataSampleGroup.minimalIteration}</span>
        <div>
            {dataSampleGroup.pipeline.descriptor}
        </div>
        {(!pipelineData[dataSampleGroup.pipeline.id] || (!pipelineData[dataSampleGroup.pipeline.id].isRunning && !pipelineData[dataSampleGroup.pipeline.id].isSuccess))  ?
            <div>
                <Button raised label='Run' onClick={() => exportPipeline(discoveryId, dataSampleGroup.pipeline.id)} />
                <OutputDataSamplePreview dataSample={dataSampleGroup.pipeline.dataSample} />
                <a href={`${applicationExecutorIri}?service=${BACKEND_URL}/discovery/${discoveryId}/${dataSampleGroup.pipeline.id}/ods/service`}>
                    <Button raised label='Show output data sample in app'/>
                </a>
                <a href={`${applicationExecutorIri}?service=${BACKEND_URL}/discovery/${discoveryId}/${dataSampleGroup.pipeline.id}/service`}>
                    <Button raised label='Go to app'/>
                </a>
            </div> :
            null
        }

        {(pipelineData[dataSampleGroup.pipeline.id] && pipelineData[dataSampleGroup.pipeline.id].isRunning && !pipelineData[dataSampleGroup.pipeline.id].isSuccess) ?
            <CircularProgress key={`progress_pipeline_${dataSampleGroup.pipeline.id}`} id={`progress_pipeline_${dataSampleGroup.pipeline.id}`} /> :
            null
        }

        {(pipelineData[dataSampleGroup.pipeline.id] && !pipelineData[dataSampleGroup.pipeline.id].isRunning && pipelineData[dataSampleGroup.pipeline.id].isSuccess) ?
            <a href={`${applicationExecutorIri}?service=${BACKEND_URL}/discovery/${discoveryId}/${dataSampleGroup.pipeline.id}/service`}>
                <Button raised label='Go to app'/>
            </a> :
            null
        }
    </li>
)

const mapStateToProps = state => ({ pipelineData: state.discovery.pipelineData })

const mapDispatchToProps = dispatch => {
    return {
        exportPipeline: (discoveryId, pipelineId) => dispatch(exportPipeline(discoveryId, pipelineId)),
        showDataSample: (discoveryId, pipelineId) => dispatch(showDataSample(discoveryId, pipelineId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSampleGroup)
