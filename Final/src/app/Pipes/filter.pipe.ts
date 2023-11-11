import { Pipe, PipeTransform } from '@angular/core';
import { GuestService } from '../Services/guest.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(private guest: GuestService) {}

  transform(value: any[], filterText: string | undefined) {
    if (!value || value.length === 0 || !filterText) {
      return value;
    }

    return value.filter((Event) => {
      if (typeof (filterText) === 'string') {
        return Event.name.toLowerCase().includes(filterText.toLowerCase());
      }
      return false; // Return false for non-string filterText
    });
  }
}

@Pipe({
  name: 'filterDate'
})
export class FilterDatePipe implements PipeTransform {

  constructor(private guest: GuestService) {}

  transform(value: any[], startDate: Date, endDate: Date): any[] {
    if (!value) {
      return [];
    }

    return value.filter(item => {
      // Assuming your item has 'startDate' and 'endDate' properties of type Date
      if (startDate && endDate) {
        return item.startdate >= startDate && item.startdate <= endDate;
      } else if (startDate) {
        return item.startdate >= startDate;
      } else if (endDate) {
        return item.startdate <= endDate;
      }

      // If neither startDate nor endDate is provided, return all items
      return true;
    });
  }
}





















