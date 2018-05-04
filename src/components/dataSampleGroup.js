import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-md/lib/Buttons/Button'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
import { exportPipeline, showDataSample } from '../actions/actions'


const DataSampleGroup = ({ dataSampleGroup, discoveryId, exportPipeline, discoveries, applicationExecutorIri }) => {
    const pipeline = discoveries[discoveryId].pipelineData[dataSampleGroup.pipeline.id]

    return (
        <li>
            <span>Minimal iteration: {dataSampleGroup.minimalIteration}</span>
            <div>
                {dataSampleGroup.pipeline.descriptor}
            </div>
            <div>
                {(!pipeline || (!pipeline.isRunning && !pipeline.isSuccess)) &&
                    <span>
                        <Button raised onClick={() => exportPipeline(discoveryId, dataSampleGroup.pipeline.id)}>
                            Run
                        </Button>
                    </span>
                }

                {(pipeline && pipeline.isRunning && !pipeline.isSuccess) &&
                    <CircularProgress key={`progress_pipeline_${dataSampleGroup.pipeline.id}`} id={`progress_pipeline_${dataSampleGroup.pipeline.id}`} />
                }

                {
                    (pipeline && !pipeline.isRunning && pipeline.isSuccess) &&
                    <a href={`${applicationExecutorIri}?service=${BACKEND_URL}/discovery/${discoveryId}/${dataSampleGroup.pipeline.id}/service`} target="_blank">
                        <Button raised>
                            Go to app
                        </Button>
                    </a>
                }

                <span>
                <a href={`${BACKEND_URL}/discovery/${discoveryId}/${dataSampleGroup.pipeline.id}/ods/service`} target="_blank">
                    <Button raised>
                        Show output data sample
                    </Button>
                </a>
                <a href={`${applicationExecutorIri}?service=${BACKEND_URL}/discovery/${discoveryId}/${dataSampleGroup.pipeline.id}/ods/service`} target="_blank">
                    <Button raised>
                        Show output data sample in app
                    </Button>
                </a>
            </span>
            </div>
        </li>
    )
}

const mapStateToProps = state => ({ discoveries: state.discoveries })

const mapDispatchToProps = dispatch => {
    return {
        exportPipeline: (discoveryId, pipelineId) => dispatch(exportPipeline(discoveryId, pipelineId)),
        showDataSample: (discoveryId, pipelineId) => dispatch(showDataSample(discoveryId, pipelineId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSampleGroup)
