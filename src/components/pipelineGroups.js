import React from 'react'
import { addIndex, map, compose } from 'ramda'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import Button from 'react-md/lib/Buttons/Button'


const exportPipeline = (discoveryId, pipelineId) => {
    fetch(`${BACKEND_URL}/discovery/${discoveryId}/execute/${pipelineId}`).then(
        success => {},
        error => {}
    )
}

const renderDataSampleGroups = (dataSampleGroups, discoveryId) => compose(
    map(dataSampleGroup => (
        <li key={dataSampleGroup.pipeline.id}>
            <span>Minimal iteration: {dataSampleGroup.minimalIteration}</span>
            <div>
                {dataSampleGroup.pipeline.descriptor}
            </div>
            <Button flat label='Export' onClick={() => exportPipeline(discoveryId, dataSampleGroup.pipeline.id)} />
        </li>
    )),
)(dataSampleGroups)

const renderExtractorGroups = (extractorGroups, discoveryId) => compose(
    addIndex(map)((extractorGroup, idx) => (
        <li key={idx}>
            <strong>{map(extractor => (<span key={extractor.uri}>Extractor: {extractor.label} ({extractor.uri})</span>), extractorGroup.extractorInstances)}</strong>
            <ul>{renderDataSampleGroups(extractorGroup.dataSampleGroups, discoveryId)}</ul>
        </li>
    )),
)(extractorGroups)

const renderDataSourceGroups = (dataSourceGroups, discoveryId) => compose(
    addIndex(map)((dataSourceGroup, idx) => (
        <li key={idx}>
            <h4>{map(dataSource => (<span key={dataSource.uri}>Data source: {dataSource.label} ({dataSource.uri})</span>), dataSourceGroup.dataSourceInstances)}</h4>
            <ul>{renderExtractorGroups(dataSourceGroup.extractorGroups, discoveryId)}</ul>
        </li>
    )),
)(dataSourceGroups)

const renderApplicationGroups = (applicationGroups, discoveryId) => compose(
    map(applicationGroup => (
        <Card key={applicationGroup.applicationInstance.uri}>
            <CardTitle
                title={applicationGroup.applicationInstance.label}
                subtitle={applicationGroup.applicationInstance.uri}
            />
            <CardText>
                <div>
                    <ul>{renderDataSourceGroups(applicationGroup.dataSourceGroups, discoveryId)}</ul>
                </div>
            </CardText>
        </Card>
    )),
)(applicationGroups)

const PipelineGroups = ({ pipelineGroups, discoveryId }) => (
    <div>
        <br />
        {renderApplicationGroups(pipelineGroups.applicationGroups, discoveryId)}
    </div>
)

export default PipelineGroups