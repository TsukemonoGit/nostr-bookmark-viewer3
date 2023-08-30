<script lang="ts">
  import {
    modalStore,
    toastStore,
    type PopupSettings,
    popup,
    ProgressBar,
    ProgressRadial,
  } from '@skeletonlabs/skeleton';
  import type { Nostr } from 'nosvelte';
  import {
    createRxNostr,
    createRxOneshotReq,
    type EventPacket,
  } from 'rx-nostr';

  import type { Observer, Subscription } from 'rxjs';

  export let parent: any;
  enum RelayState {
    Preparing,
    Connecting,
    Not_exist,
    Error,
    Exist,
  }
  interface RelayStates {
    [key: string]: RelayState;
  }
  const relays = [
    'wss://nos.lol',
    'wss://relay.damus.io',
    'wss://relay.snort.social',
    'wss://nostr-pub.wellorder.net',
    'wss://relay.nostr.band',
    'wss://yabu.me',
    'wss://relay-jp.nostr.wirednet.jp',
    'wss://nostr-relay.nokotaro.com',
    'wss://nostr.holybea.com',
    'wss://nostr.wine',
    'wss://nostr.bitcoiner.social',
    'wss://nostr-pub.wellorder.net',
    'wss://relay.nostr.bg',
    'wss://nostr.mom',
    'wss://relay.orangepill.dev',
    'wss://no.str.cr',
    'wss://relay.nostr.com.au',
    'wss://offchain.pub',
    'wss://relay.plebstr.com',
    'wss://nostr.fmt.wiz.biz',
    'wss://nostr.rocks',
    'wss://nostr.mutinywallet.com',
    'wss://e.nos.lol',
    'wss://relayable.org',
    'wss://relay.mostr.pub',
  ];

  //   const relaysState = relays.map((relay) => {
  //     return { relay: relay, state: RelayState.Preparing };
  //   });

  let relaysState: RelayStates = {};

  relays.forEach((relay) => {
    relaysState[relay] = RelayState.Preparing;
  });

  $: relaysState = relaysState;
  //   const relaysState = relays.map((relay) => {
  //     return { [relay]: RelayState.Preparing };
  //   });
  //let isSuccess: boolean = false;
  const inievent: Nostr.Event<number> = {
    id: '',
    pubkey: '',
    created_at: 0,
    kind: 1,
    tags: [],
    content: '',
    sig: '',
  };

  let event: Nostr.Event<number> = {
    id: '',
    pubkey: '',
    created_at: 0,
    kind: 1,
    tags: [],
    content: '',
    sig: '',
  };

  let res = {};
  let subscription: Subscription;
  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit(): void {
    if ($modalStore[0].response) $modalStore[0].response(res);

    modalStore.close();
  }

  // Base Classes
  const cBase = 'card p-4 w-modal shadow-xl space-y-4';
  const cHeader = 'text-2xl font-bold';
  // const cForm =
  //   'border border-surface-500 p-4 space-y-4 rounded-container-token';

  function stateColor(state: RelayState): string {
    // ここで各状態に対応するクラスを返すように修正する
    switch (state) {
      case RelayState.Connecting:
        return 'badge bg-surface-400';
      case RelayState.Not_exist:
        return 'badge bg-warning-400';
      case RelayState.Error:
        return 'badge bg-error-400';
      case RelayState.Exist:
        return 'badge bg-success-500';
      default:
        return 'badge bg-surface-300';
    }
  }
  const rxNostr = createRxNostr();
  let logs: string[] = [];
  $: logs = logs;
  let nowLoading: boolean = false;
  function onClick() {
    nowLoading = true;
    //isSuccess = false;
    logs = [];
    event = inievent;
    rxNostr.setRelays(relays);
    console.log($modalStore[0].value.id);
    const filters = [{ ids: [$modalStore[0].value.id] }];
    const rxReq = createRxOneshotReq({ filters });

    relays.forEach((relay) => {
      relaysState[relay] = RelayState.Connecting;
    });
    // データの購読
    const observable = rxNostr.use(rxReq);

    // オブザーバーオブジェクトの作成
    const observer: Observer<any> = {
      next: (packet: EventPacket) => {
        console.log(packet);
        relaysState[packet.from] = RelayState.Exist;
        event = packet.event;
      },
      error: (error) => {
        console.error('Error occurred:', error);
      },
      complete: () => {
        console.log('Subscription completed');
        nowLoading = false;
      },
    };
    // 購読開始
    subscription = observable.subscribe(observer);
    // 全エラーを監視するObservableの購読
    const rxErrorSubscription = rxNostr
      .createAllErrorObservable()
      .subscribe((error) => {
        console.error('Error occurred globally:', error);
        // グローバルなエラー処理を行う
        relaysState[error.from] = RelayState.Error;
      });

    // Send CLOSE message in 10 seconds
    setTimeout(() => {
      subscription.unsubscribe();
      nowLoading = false;
      if (event.sig === '') {
        logs.push(`failed to get Event`);
      }
    }, 5 * 1000);
  }

  async function onClickDup() {
    subscription.unsubscribe();
    console.log($modalStore[0].value.searchRelays);
    const sendRelays = $modalStore[0].value.searchRelays;
    for (let i = 0; i < sendRelays.length; i++) {
      const ws = new WebSocket(sendRelays[i]);
      ws.onopen = () => {
        logs.push(`Connected to ${sendRelays[i]}`);
        logs = logs;
        ws.send(JSON.stringify(['EVENT', event]));
      };
      ws.onmessage = (e) => {
        console.log(e);
        const msg = JSON.parse(e.data);

        logs.push(`message from ${sendRelays[i]}: ${e.data}`);
        logs = logs;
        if (msg[2]) {
          logs.push(`${sendRelays[i]}:Success`);
          logs = logs;
          // isSuccess = true;
        } else {
          logs.push(`${sendRelays[1]}: Failed (reason:  ${msg[3]})`);
          logs = logs;
        }
      };
    }
  }
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
  <div class="modal-example-form {cBase} overflow-h-auto">
    <div class="grid grid-cols-[1fr_auto]">
      <header class={cHeader}>
        {$modalStore[0].title ?? '(title missing)'}
      </header>
      {#if nowLoading}
        <ProgressRadial
          ...
          stroke={100}
          meter="stroke-primary-500"
          track="stroke-primary-500/30"
          width="w-12"
        />
      {/if}
    </div>
    <article class="body break-all whitespace-pre-wrap">
      {$modalStore[0].body ?? '(body missing)'}
    </article>
    <!-- Enable for debugging: -->
    <div class="break-all text-sm grid grid-cols-[0.5fr_0.5fr]">
      {#each relays as relay, index}
        <div class="card m-0 p-0 text-sm bg-grey">
          <span class={stateColor(relaysState[relay])} />
          {relay}
        </div>
      {/each}
    </div>
    <button class="btn {parent.buttonNeutral}" on:click={onClick}>search</button
    >
    {#if event.sig !== ''}
      <button class="btn {parent.buttonNeutral}" on:click={onClickDup}
        >duplicate</button
      >
    {/if}
    {#if event.sig !== ''}
      <div class="border">Event</div>
      <div class="break-all whitespace-pre-wrap max-h-[8rem] overflow-y-auto">
        {JSON.stringify(event, null, 2)}
      </div>
    {/if}
    {#if logs.length > 0}
      <div class="border">Log</div>
      <div class="break-all whitespace-pre-wrap max-h-[8rem] overflow-y-auto">
        {#each logs as l}
          <div class="break-all whitespace-pre-wrap">{l}</div>
        {/each}
      </div>
    {/if}
    <label class="label break-all whitespace-pre-wrap">
      <!-- prettier-ignore -->
      <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        
        </footer>
    </label>
  </div>

  <!--NostrAppをあたらしくつくるのはだめっぽい？
     {#if isSuccess}
    <NostrApp relays={$modalStore[0].value.searchRelays}>
      <Text queryKey={[event.id]} id={event.id} let:text />
    </NostrApp>
  {/if} -->
{/if}
