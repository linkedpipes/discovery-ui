import React from 'react';
import Toolbar from 'react-md/lib/Toolbars'
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

import { map, compose, values } from 'ramda';

const renderRows = compose(
    map(row => (
        <TableRow key={row.uri}>
            <TableColumn>{row.label}</TableColumn>
            <TableColumn>{row.uri}</TableColumn>
        </TableRow>
    ))
)

const DiscoveryInputPart = (props) => (
    <div>
        <Toolbar themed title={props.label} />
        <DataTable
            baseId={props.componentType}
            onRowToggle={(index, isActive, count) => {
                return props.toggleDiscoveryInputItem(
                    props.components[index-1] ? props.components[index-1].uri : null,
                    isActive,
                    props.componentType,
                    count,
                )
            }}
        >
            <TableHeader>
                <TableRow>
                    <TableColumn>Label</TableColumn>
                    <TableColumn>Uri</TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {renderRows(props.components)}
            </TableBody>
        </DataTable>
    </div>
)

export default DiscoveryInputPart