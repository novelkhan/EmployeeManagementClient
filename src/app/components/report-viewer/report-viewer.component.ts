import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss']
})
export class ReportViewerComponent {
  constructor(private employeeService: EmployeeService) { }

  generateReport(reportName: string, format: string): void {
    this.employeeService.generateReport(reportName, format).subscribe(blob => {
      saveAs(blob, `${reportName}.${format.toLowerCase()}`);
    });
  }
}