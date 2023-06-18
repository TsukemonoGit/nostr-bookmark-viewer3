<script lang="ts">
  import { fetchFilteredEvents } from '$lib/function';
  import { RelaysforSearch, nowProgress, profileEvents } from '$lib/store';
  import {
    modalStore,
    toastStore,
    type ToastSettings,
    Avatar,
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
      } else {
        $profileEvents.push(thisProfile[0]);
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
  <div class=" modal-example-form {cBase} ">
    <!--profile-->

    <div class="grid grid-row-[auto_auto_auto] gap-1 max-w-md">
      <div class="grid grid-cols-[auto_1fr] gap-2 max-w-md">
        <div>
          <Avatar
            src={$modalStore[0].value.profile?.picture}
            width="w-16"
            rounded="rounded-lg
"
          />
        </div>
        <div>
          <img class="" src={$modalStore[0].value.profile?.banner} alt="" />
        </div>
      </div>
      <div class="rounded-sm border-4 border-dotted border-surface-300 p-1">
        <div class="font-bold">about</div>
        <div
          class="break-all whitespace-pre-wrap text-sm max-h-32 overflow-auto"
        >
          {$modalStore[0].value.profile?.about}
        </div>
      </div>
      <div class="rounded-sm border-4 border-dotted border-surface-300 p-1">
        <div class="font-bold">profileJSON</div>
        <div
          class="break-all whitespace-pre-wrap text-sm max-h-24 overflow-auto"
        >
          {JSON.stringify($modalStore[0].value.profile, undefined, 4)}
        </div>
      </div>
    </div>

    <!--button-->
    <div class="grid grid-cols-[auto_auto_auto] gap-2">
      <div class="grid grid-row-[auto_auto] gap-2">
        <button
          type="button"
          class="btn variant-filled-secondary p-1"
          on:click={() => onClickButton('npub')}>copy pubKey</button
        >

        <button
          type="button"
          class="btn variant-filled-secondary p-1"
          on:click={() => onClickButton('hex')}>copy hexKey</button
        >
      </div>
      <div class="grid grid-row-[auto_auto] gap-2">
        <button
          type="button"
          class="btn variant-filled-surface p-2"
          on:click={() => {
            window.open(
              'https://nostr.com/' + $modalStore[0]?.value.pubKey,
              '_blank',
            );
            parent.onClose();
          }}>Open in external app</button
        >
        <button
          type="button"
          class="btn variant-filled-surface p-2"
          on:click={() => onClickUpdateProfile()}>update profile</button
        >
      </div>

      <button
        type="button"
        class="btn variant-filled-surface p-2"
        on:click={parent.onClose}>{parent.buttonTextCancel}</button
      >
    </div>
  </div>
{/if}

<style>
  .banner {
    min-width: 6em;
    max-width: 100px;
  }
  .profile {
    text-shadow: 1px 1px 2px lightgray, -1px -1px 2px lightgray;
  }
</style>
