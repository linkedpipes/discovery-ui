import React from "react";
import DiscoveryInputPart from "./discoveryInputPart";
import {filter, compose, values} from 'ramda';

const typeFilter = (componentType) => compose(
    filter((c) => c.type == componentType),
    values,
);

const DiscoveryInput = ({components, ...props}) => (
    <div>
        <DiscoveryInputPart label="Data sources" components={typeFilter('datasource')(components)} {...props}/>
        <DiscoveryInputPart label="Transformers" components={typeFilter('transformer')(components)} {...props}/>
        <DiscoveryInputPart label="Applications" components={typeFilter('application')(components)} {...props}/>
    </div>
);

export default DiscoveryInput;