import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import GoogleMap from 'google-map-react';

function LocationTab(props) {
    const methods = useFormContext();
    const { control } = methods;

    function Marker({ text }) {
        return (
            <Tooltip title={text} placement="top">
                <Icon className="text-red">place</Icon>
            </Tooltip>
        );
    }

    return (
        <div className="w-full">
            <Typography className="h2 mb-16">Device Location</Typography>
            <div className="w-full h-512">
                <GoogleMap
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_MAP_KEY
                    }}
                    defaultZoom={12}
                    defaultCenter={[-34.397, 150.64]}
                >
                    <Marker text="Marker Text" lat="-34.397" lng="150.644" />
                </GoogleMap>
            </div>
        </div>
    );
}

export default LocationTab;
