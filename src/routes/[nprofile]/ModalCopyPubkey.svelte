<script lang="ts">
  import { fetchFilteredEvents } from '$lib/function';
  import { RelaysforSearch, nowProgress, profileEvents } from '$lib/store';
  import {
    modalStore,
    toastStore,
    type ToastSettings,
  } from '@skeletonlabs/skeleton';
  export let parent: any;
  // Base Classes
  const cBase = 'card p-4  shadow-xl space-y-4 break-all';

  //$modalStore[0]?.value.hexKey
  function onClickButton(str: string) {
    const text =
      str === 'npub'
        ? $modalStore[0]?.value.pubKey
        : $modalStore[0]?.value.hexKey;

    navigator.clipboard.writeText(text).then(
      () => {
        // コピーに成功したときの処理
        console.log(`copied: ${text.slice(0, 15)}...`);

        const t: ToastSettings = {
          message: `copied: ${text.slice(0, 15)}...`,
          timeout: 3000,
        };
        toastStore.trigger(t);
      },
      () => {
        // コピーに失敗したときの処理
        console.log('コピー失敗');
        /**@type {import('@skeletonlabs/skeleton').ToastSettings}*/
        const t: ToastSettings = {
          message: 'failed to copy',
          timeout: 3000,
          background: 'bg-orange-500 text-white width-filled ',
        };
        toastStore.trigger(t);
      },
    );

    parent.onClose();
  }

  async function onClickUpdateProfile() {
    $nowProgress = true;

    const pFilter = [{ kinds: [0], authors: [$modalStore[0]?.value.hexKey] }];
    //eventを取りに行く
    console.log(pFilter);
    const thisProfile = await fetchFilteredEvents(RelaysforSearch, pFilter);
    //console.log(thisNote);
    if (thisProfile.length > 0) {
      const index = $profileEvents.findIndex(
        (event) => event.pubkey === thisProfile[0].pubkey,
      );
      if (index !== -1) {
        $profileEvents[index] = thisProfile[0];
      }
      // ローカルストレージに保存
      localStorage.setItem('profiles', JSON.stringify($profileEvents));
      $profileEvents = $profileEvents;
      const t: ToastSettings = {
        message: `profileを更新しました`,
        timeout: 3000,
      };
      toastStore.trigger(t);
    } else {
      const t: ToastSettings = {
        message: `profileの取得に失敗しました`,
        timeout: 5000,
        background: 'variant-filled-error',
      };
      toastStore.trigger(t);
    }
    parent.onClose();
    $nowProgress = false;
  }
</script>

<!-- @component This example creates a simple form modal. -->
{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <div class="grid grid-row-[auto_auto_auto] gap-2">
      <button
        type="button"
        class="btn variant-filled-secondary"
        on:click={() => onClickButton('npub')}>copy pubKey to clipboard</button
      >

      <button
        type="button"
        class="btn variant-filled-secondary"
        on:click={() => onClickButton('hex')}>copy hexKey to clipboard</button
      >

      <button
        type="button"
        class="btn variant-filled-surface"
        on:click={() => {
          window.open(
            'https://nostr.com/' + $modalStore[0]?.value.pubKey,
            '_blank',
          );
          parent.onClose();
        }}>open on nostr.com</button
      >
      <button
        type="button"
        class="btn variant-filled-surface"
        on:click={() => onClickUpdateProfile()}>update profile</button
      >
    </div>
    <footer class="modal-footer {parent.regionFooter}">
      <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
        >{parent.buttonTextCancel}</button
      >
    </footer>
  </div>
{/if}
