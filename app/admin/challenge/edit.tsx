import { SimpleForm, required, TextInput, ReferenceInput, NumberInput, Edit } from "react-admin";

export const ChallengeEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput source="id" validate={[required()]} label="ID"/>
                <TextInput source="title" validate={[required()]} label="Title"/>
                <TextInput source="description" validate={[required()]} label="Description"/>
                <ReferenceInput source="courseId" reference="courses"/>
                <NumberInput source="order" validate={[required()]} label="Order"/>
            </SimpleForm>
        </Edit>
    );
};