import { OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

export abstract class Unsubscribe implements OnDestroy {
    destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}