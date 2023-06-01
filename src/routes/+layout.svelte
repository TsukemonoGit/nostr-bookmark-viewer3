<script>
  // Your selected Skeleton theme:
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

  // This contains the bulk of Skeletons required styles:
  // NOTE: this will be renamed skeleton.css in the v2.x release.
  import '@skeletonlabs/skeleton/styles/skeleton.css';
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import '../app.postcss';
</script>

<slot />
