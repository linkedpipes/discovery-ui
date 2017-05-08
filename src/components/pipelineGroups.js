import React from 'react'
import { map, compose } from 'ramda'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'


const renderDataSampleGroups = compose(
    map(dataSampleGroup => (
        <div>
            <span>MI: {dataSampleGroup.minimalIteration}</span>
            <div>{dataSampleGroup.pipeline.name}</div>
        </div>
    )),
)

const renderExtractorGroups = compose(
    map(extractorGroup => (
        <div>
            <strong>{map(extractor => (<span>{extractor.name}</span>), extractorGroup.extractorInstances)}</strong>
            <div>{renderDataSampleGroups(extractorGroup.dataSampleGroups)}</div>
        </div>
    )),
)

const renderDataSourceGroups = compose(
    map(dataSourceGroup => (
        <div>
            <h3>{map(dataSource => (<span>{dataSource.label}</span>), dataSourceGroup.dataSourceInstances)}</h3>
            <div>{renderExtractorGroups(dataSourceGroup.extractorGroups)}</div>
        </div>
    )),
)

const renderApplicationGroups = compose(
    map(applicationGroup => (
        <Card>
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