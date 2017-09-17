import React from 'react'
import { addIndex, map, compose } from 'ramda'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import DataSampleGroup from './dataSampleGroup'

const renderDataSampleGroups = (dataSampleGroups, discoveryId, applicationExecutorUri) => compose(
    map(dataSampleGroup => (
        <DataSampleGroup key={dataSampleGroup.pipeline.id}
            dataSampleGroup={dataSampleGroup}
            discoveryId={discoveryId}
            applicationExecutorUri={applicationExecutorUri}
        />
    )),
)(dataSampleGroups)

const renderExtractorGroups = (extractorGroups, discoveryId, applicationExecutorUri) => compose(
    addIndex(map)((extractorGroup, idx) => (
        <li key={idx}>
            <strong>{map(extractor => (<span key={extractor.uri}>Extractor: {extractor.label} ({extractor.uri})</span>), extractorGroup.extractorInstances)}</strong>
            <ul>{renderDataSampleGroups(extractorGroup.dataSampleGroups, discoveryId, applicationExecutorUri)}</ul>
        </li>
    )),
)(extractorGroups)

const renderDataSourceGroups = (dataSourceGroups, discoveryId, applicationExecutorUri) => compose(
    addIndex(map)((dataSourceGroup, idx) => (
        <li key={idx}>
            <h4>{map(dataSource => (<span key={dataSource.uri}>Data source: {dataSource.label} ({dataSource.uri})</span>), dataSourceGroup.dataSourceInstances)}</h4>
            <ul>{renderExtractorGroups(dataSourceGroup.extractorGroups, discoveryId, applicationExecutorUri)}</ul>
        </li>
    )),
)(dataSourceGroups)

const ApplicationGroup = ({ applicationGroup, discoveryId }) => (
    <Card key={applicationGroup.applicationInstance.uri}>
        <CardTitle
            title={applicationGroup.applicationInstance.label}
            subtitle={applicationGroup.applicationInstance.uri}
        />
        <CardText>
            <div>
                <ul>{renderDataSourceGroups(applicationGroup.dataSourceGroups, discoveryId, applicationGroup.applicationInstance.executorUri)}</ul>
            </div>
        </CardText>
    </Card>
)

export default ApplicationGroup