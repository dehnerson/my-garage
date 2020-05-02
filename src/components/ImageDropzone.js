import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Avatar, Typography, InputLabel, Container } from '@material-ui/core';
import ImagesDialog from './ImagesDialog';


const useStyles = makeStyles((theme) => ({
    dropzone: {
        marginTop: 0,
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3, 1, 3, 1),
        borderStyle: 'dashed',
        borderWidth: '1px',
        borderRadius: '4px',
        borderColor: 'rgba(255, 255, 255, 0.23)',
        '&:hover': {
            borderColor: 'white',
        }
    },
    dropzoneNotEditable: {
        borderStyle: 'solid',
    },
    thumbsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: theme.spacing(1),
        justifyContent: 'center'
    },
    thumb: {
        margin: theme.spacing(1, 0.5, 0, 0.5)
    }
}));


const ImageDropzone = (props) => {
    const [focusedImageDialogOpen, setFocusedImageDialogOpen] = useState(false);
    const [focusedImage, setFocusedImage] = useState({});

    const handleDrop = (acceptedFiles) => {
        const newFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));

        props.setFiles(props.files.concat(newFiles).slice(-props.imageAmount));
    }

    let { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: handleDrop
    });

    const handleClick = (e, image) => {
        setFocusedImage(image);
        setFocusedImageDialogOpen(true);
        e.stopPropagation();
    }

    const handleFileDelete = (index) => {
        const newFiles = [...props.files];
        newFiles.splice(index, 1);

        props.setFiles(newFiles);
    }

    const handleImageDelete = (index) => {
        const newImages = [...props.images];
        newImages.splice(index, 1);

        props.setImages(newImages);
    }

    const classes = useStyles();

    let thumbsFiles = [];

    if (!props.notEditable && props.files) {
        thumbsFiles = props.files.map((file, index) => (
            <Chip key={file.name} clickable onClick={e => handleClick(e, { url: file.preview, alt: file.name })} onDelete={e => handleFileDelete(index)} label={file.name} avatar={<Avatar src={file.preview} />} className={classes.thumb} />
        ));
    }

    let thumbsImages = [];

    if (props.images) {
        thumbsImages = props.images.map((image, index) => (
            <Chip key={image.path} clickable onClick={e => handleClick(e, image)} onDelete={props.notEditable ? null : e => handleImageDelete(index)} label={image.path && image.path.split('/').pop()} avatar={<Avatar src={image.url} />} className={classes.thumb} />
        ));
    }

    useEffect(() => () => {
        if (props.files) {
            // Make sure to revoke the data uris to avoid memory leaks
            props.files.forEach(file => URL.revokeObjectURL(file.preview));
        }
    }, [props.files]);

    if (props.notEditable) {
        getRootProps = () => null;
        getInputProps = () => null;
    }

    return (
        <div>
            <Container maxWidth='sm' className={clsx(props.className, classes.dropzone, { [classes.dropzoneNotEditable]: props.notEditable })} {...getRootProps()}>
                {!props.notEditable &&
                    <input {...getInputProps()} />
                }
                <InputLabel>
                    <Typography variant='subtitle1'>{props.title}</Typography>
                </InputLabel>
                {thumbsFiles.length === 0 && thumbsImages.length === 0 && !props.notEditable &&
                    <InputLabel>
                        <Typography variant='body2'>Drag 'n' drop some files here, or click to select files</Typography>
                    </InputLabel>
                }
                <div className={classes.thumbsContainer}>
                    {thumbsFiles}
                    {thumbsImages}
                </div>
            </Container>
            <ImagesDialog open={focusedImageDialogOpen} handleClose={e => setFocusedImageDialogOpen(false)} src={focusedImage.url} alt={focusedImage.path}></ImagesDialog>
        </div>
    );
}


export default ImageDropzone;