<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { darkMode } from "../../dark";
	import List from "../List";
	import TextField from "../TextField";
	import { ClassBuilder } from "../../utils/classes.js";

	const classesDefault = "cursor-pointer relative";
	const listClassesDefault =
		"dropdown-menu absolute arrow w-auto top-11 mr-2 right-0 rounded shadow z-20 bg-white dark:bg-dark-500 whitespace-nowrap";

	export let open = false;
	export let classes = classesDefault;
	export let listClasses = listClassesDefault;

	const cb = new ClassBuilder($$props.class);

	$: c = cb
		.flush()
		.add(classes, true, classesDefault)
		.add($$props.class)
		.get();

	const lcb = new ClassBuilder(listClasses, listClassesDefault);

	$: l = lcb.flush().add("arrow-dark", $darkMode, classesDefault).get();

	const dispatch = createEventDispatcher();
</script>

<svelte:window on:click={() => (open = false)} />

<div class={c} on:click|stopPropagation>
	<slot name="activator" />
	{#if open}
		<div class={l}>
			<slot name="menu" />
		</div>
	{/if}
</div>

<style>
	.arrow:before {
		color: white;
	}
	.arrow-dark:before {
		color: gray;
	}

	.dropdown-menu::before {
		/* TODO: make this less fragile */
		top: -16px;
		right: 12px;
		left: auto;
	}

	.dropdown-menu::before {
		border: 8px solid transparent;
		border-bottom-color: transparent;
		border-bottom-color: var(--color-border-default);
	}

	.dropdown-menu::before,
	.dropdown-menu::after {
		position: absolute;
		display: inline-block;
		content: "";
	}
</style>
