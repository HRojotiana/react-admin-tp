"use client"

import React from "react"
import jsonServerProvider from "ra-data-json-server"
import { Admin, Datagrid, EditButton, Filter, FunctionField, List, ReferenceField, Resource, TextField, TextInput, useRecordContext } from "react-admin"
import { useNavigate } from "react-router-dom";
import CommentButton from "./CommentButton";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const PostList: React.FC = (props) => {
    const navigate = useNavigate();

    const CommentButton = () => {
        const record = useRecordContext();
        return <button onClick={() => navigate(`/comments?filter={"postId":${record.id}}`)}> View Comments </button>
    }

return (
    <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="title" />
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <FunctionField label="Comments" render={() =><CommentButton/>}/>
            <EditButton/>
        </Datagrid>
    </List>
);
};

const CommentFilter: React.FC = (props) => (
    <Filter {...props}>
        <TextInput label="Post ID" source="postId" alwaysOn/>
    </Filter>
);

const CommentList: React.FC = (props) => (
    <List {...props} filters={<CommentFilter/>}>
        <Datagrid>
            <TextField source ="id" />
            <TextField source = "name" label="Post title"/>
            <ReferenceField source="postId" reference="posts">
                <TextField source="title"/>
            </ReferenceField>
            <TextField source="email"/> 
            <TextField source="body"/>
            <EditButton/>
        </Datagrid>
    </List>
);

const AdminApp: React.FC = () => (
    <Admin dataProvider = {dataProvider}>
        <Resource name = "posts" list={PostList}/>
        <Resource name="comments" list={CommentList}/>
    </Admin>
);

export default AdminApp;