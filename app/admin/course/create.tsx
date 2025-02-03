import { SimpleForm, Create, TextField, required, TextInput } from "react-admin";

export const CourseCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="title" validate={[required()]} label="Title"/>
                <TextInput source="imageSrc" validate={[required()]} label="Image"/>
            </SimpleForm>
        </Create>
    );
};