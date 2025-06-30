import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // ✅ Add this
import { saveAs } from 'file-saver';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss']
})
export class ReportViewerComponent {
  pdfSrc: Blob | undefined;
  showPreview: boolean = false;

  iframeUrl: SafeResourceUrl; // ✅ For iframe

  constructor(
    private employeeService: EmployeeService,
    private sanitizer: DomSanitizer // ✅ Required for safe iframe src
  ) {
    // ✅ Set iframe display URL (adjust if API changes)
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://localhost:7287/api/Report/preview?reportName=EmployeeListReport'
    );
  }

  generateReport(reportName: string, format: string): void {
    this.employeeService.generateReport(reportName, format).subscribe({
      next: (blob) => {
        saveAs(blob, `${reportName}.${format.toLowerCase()}`);
      },
      error: (err) => {
        console.error('Error downloading report:', err);
        alert('Failed to download report. Please check the console for details.');
      }
    });
  }

  previewReport(reportName: string): void {
    this.employeeService.previewReport(reportName).subscribe({
      next: (blob) => {
        console.log('Blob received:', blob);
        this.pdfSrc = blob;
        this.showPreview = true;
      },
      error: (err) => {
        console.error('Error previewing report:', err);
        alert('Failed to preview report. Please check the console for details.');
      }
    });
  }

  closePreview(): void {
    this.showPreview = false;
    this.pdfSrc = undefined;
  }
}