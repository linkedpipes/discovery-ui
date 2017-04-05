import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';

const DiscoveryInputPart = (props) => (
    <div>
        <Toolbar>
            <ToolbarGroup>
                <ToolbarTitle text={props.label} />
                <FontIcon className="muidocs-icon-custom-sort" />
                <ToolbarSeparator />
            </ToolbarGroup>
        </Toolbar>
        <Table
            selectable
            multiSelectable
        >
            <TableHeader
                displaySelectAll
                adjustForCheckbox
                enableSelectAll
            >
                <TableRow>
                    <TableHeaderColumn tooltip="URI">URI</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Label">Label</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox
                deselectOnClickaway
                showRowHover
            >
                {[{},{},{}].map( (row, index) => (
                    <TableRow key={index} selected={row.selected}>
                        <TableRowColumn>{row.uri}</TableRowColumn>
                        <TableRowColumn>{row.label}</TableRowColumn>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
);

export default DiscoveryInputPart;