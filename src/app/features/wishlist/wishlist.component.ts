import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/core/services/wishlist/wishlist.service';
import { WishlistItemDTO } from 'src/app/core/models/wishlist/wishlist-item.model';

@Component({
  selector: 'app-wishlist',
  standalone:false,
  styleUrls: ['./wishlist.component.scss'],
  templateUrl: './wishlist.component.html'
})
export class WishlistComponent implements OnInit {
  wishlist: WishlistItemDTO[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe(data => this.wishlist = data);
  }

  remove(productId: number) {
    this.wishlistService.removeFromWishlist(productId).subscribe(() => this.ngOnInit());
  }
}
