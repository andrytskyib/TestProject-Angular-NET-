import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../common/api/services/product.service';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {ProductModel} from '../../../common/api/models/product-model';
import {CreatePopupComponent} from '../create-popup/create-popup.component';
import {Subscription} from 'rxjs';
import {UtilityService} from '../../../common/services/utility.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['actions', 'id', 'name', 'description', 'price', 'creationDate', 'creatorId'];
  dataSource = new MatTableDataSource<ProductModel>([]);

  subscription$: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public productService: ProductService,
    private dialog: MatDialog,
    private utilityService: UtilityService,
    private router: Router) { }

  ngOnInit() {
    this.productService.GetProducts();
    this.subscription$ = this.productService.products$.subscribe(res => {
      if (res) {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  create() {
    const dialogRef = this.dialog.open(CreatePopupComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.productService.GetProducts();
        this.utilityService.openSnackBar('Success', 'success');
      }
    });
  }

  openProduct(id) {
    this.router.navigate(['product/', id]);
  }

  delete(element) {
    this.productService.DeleteProduct(element.id).subscribe(res => {
      this.productService.GetProducts();
      this.utilityService.openSnackBar('Success', 'success');
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

}
