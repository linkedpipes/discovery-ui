import React from 'react'
import { addIndex, map, compose } from 'ramda'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import DataSampleGroup from './dataSampleGroup'

const renderDataSampleGroups = (dataSampleGroups, discoveryId) => compose(
    map(dataSampleGroup => (
        <DataSampleGroup
            dataSampleGroup={dataSampleGroup}
            discoveryId={discoveryId}
        />
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

const ApplicationGroup = ({ applicationGroup, discoveryId }) => (
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
)

export default ApplicationGroup