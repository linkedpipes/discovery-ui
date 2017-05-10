import React from 'react'
import { addIndex, map, compose, values } from 'ramda'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'


const renderDataSampleGroups = compose(
    map(dataSampleGroup => (
        <div key={dataSampleGroup.pipelineId}>
            <span>MI: {dataSampleGroup.minimalIteration}</span>
            <div>{dataSampleGroup.pipeline.name}</div>
        </div>
    )),
)

const renderExtractorGroups = compose(
    addIndex(map)((extractorGroup, idx) => (
        <div key={idx}>
            <strong>{map(extractor => (<span key={extractor.uri}>{extractor.name}</span>), extractorGroup.extractorInstances)}</strong>
            <div>{renderDataSampleGroups(extractorGroup.dataSampleGroups)}</div>
        </div>
    )),
)

const renderDataSourceGroups = compose(
    addIndex(map)((dataSourceGroup, idx) => (
        <div key={idx}>
            <h3>{map(dataSource => (<span key={dataSource.uri}>{dataSource.label}</span>), dataSourceGroup.dataSourceInstances)}</h3>
            <div>{renderExtractorGroups(dataSourceGroup.extractorGroups)}</div>
        </div>
    )),
)

const renderApplicationGroups = compose(
    map(applicationGroup => (
        <Card key={applicationGroup.applicationInstance.uri}>
            <CardTitle
                title={applicationGroup.applicationInstance.name}
            />
            <CardText>
                <div>
                    <div>{renderDataSourceGroups(applicationGroup.dataSourceGroups)}</div>
                </div>
            </CardText>
        </Card>
    )),
)

const PipelineGroups = ({ pipelineGroups }) => (
    <div>
        <br />
        {renderApplicationGroups(pipelineGroups.applicationGroups)}
    </div>
)

export default PipelineGroups