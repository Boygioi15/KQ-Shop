import { PartialType } from '@nestjs/mapped-types';
import { AddNewAddressDTO } from './add-new-address.dto';

export class UpdateAddressDTO extends PartialType(AddNewAddressDTO) {}
