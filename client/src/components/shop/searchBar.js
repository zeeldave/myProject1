import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from 'utils/tools';
import {
    TextField
} from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from '@material-ui/icons/Cancel';



const SearchBar = ({ handleKeywords, resetSearch }) => {

    const formik = useFormik({
        initialValues:{ keywords: ''},
        validationSchema: Yup.object({
            keywords: Yup.string()
            .min(3,'You need to search for more than 3')
            .max(200,'You need to search for less than 200')
        }),
        onSubmit:( values,{ resetForm })=>{
            handleKeywords(values.keywords)
            resetForm();
        }
    })


    return(
        <div className="container">
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        style={{
                            width:'100%'
                        }}
                        placeholder="Search for something"
                        name="keywords"
                        variant="outlined"
                        {...formik.getFieldProps('keywords')}
                        {...errorHelper(formik,'keywords')}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                <IconButton type="submit">
                                  <SearchIcon />
                                </IconButton>
                                <IconButton onClick={resetSearch}>
                                <CancelIcon/>
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                    />
                </div>
            </form>
        </div>
    )
}

export default SearchBar;