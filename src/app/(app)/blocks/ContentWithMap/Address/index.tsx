import {Address as AddressType} from "@/payload-types";
import classes from './index.module.scss'
export function Address({address, className}: { address: AddressType, className?: string }) {
    return <address className={`${classes.address} ${className}`}>
        <p>{address.locationName}</p>
        <p>{address.streetAddress}</p>
        {address.optionalAdditionalStreetAddress && <p>optionalAdditionalStreetAddress</p>}
        <p>
            {address.city}, {address.state} {address.zip}
        </p>
    </address>
}
