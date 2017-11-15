import React from 'react'
import { addIndex, map, compose } from 'ramda'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import DataSampleGroup from './dataSampleGroup'

const renderDataSampleGroups = (dataSampleGroups, discoveryId, applicationExecutorIri) => compose(
    map(dataSampleGroup => (
        <DataSampleGroup key={dataSampleGroup.pipeline.id}
            dataSampleGroup={dataSampleGroup}
            discoveryId={discoveryId}
            applicationExecutorIri={applicationExecutorIri}
        />
    )),
)(dataSampleGroups)

const renderExtractorGroups = (extractorGroups, discoveryId, applicationExecutorIri) => compose(
    addIndex(map)((extractorGroup, idx) => (
        <li key={idx}>
            <strong>{map(extractor => (<span key={extractor.iri}>Extractor: {extractor.label} ({extractor.iri})</span>), extractorGroup.extractorInstances)}</strong>
            <ul>{renderDataSampleGroups(extractorGroup.dataSampleGroups, discoveryId, applicationExecutorIri)}</ul>
        </li>
    )),
)(extractorGroups)

const renderDataSourceGroups = (dataSourceGroups, discoveryId, applicationExecutorIri) => compose(
    addIndex(map)((dataSourceGroup, idx) => (
        <li key={idx}>
            <h4>{map(dataSource => (<span key={dataSource.iri}>Data source: {dataSource.label} ({dataSource.iri})</span>), dataSourceGroup.dataSourceInstances)}</h4>
            <ul>{renderExtractorGroups(dataSourceGroup.extractorGroups, discoveryId, applicationExecutorIri)}</ul>
        </li>
    )),
)(dataSourceGroups)

const ApplicationGroup = ({ applicationGroup, discoveryId }) => (
    <Card key={applicationGroup.applicationInstance.iri}>
        <CardTitle
            title={applicationGroup.applicationInstance.label}
            subtitle={applicationGroup.applicationInstance.iri}
        />
        <CardText>
            <div>
                <ul>{renderDataSourceGroups(applicationGroup.dataSourceGroups, discoveryId, applicationGroup.applicationInstance.executorIri)}</ul>
            </div>
        </CardText>
    </Card>
)

export default ApplicationGroup