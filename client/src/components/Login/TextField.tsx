import React from 'react';
import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import {Field, FieldHookConfig, useField} from "formik";
import {ITextFieldProps} from "../../../client_declarations";

const TextField: React.FC<ITextFieldProps> = ({label, ...props}) => {
    const [field, meta] = useField(props as FieldHookConfig<any>);
    return (
        <FormControl isInvalid={!!(meta.touched && meta.error)}>
            <FormLabel>{label}</FormLabel>
            <Input as={Field} {...field} {...props} />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default TextField;