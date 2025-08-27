function useFocusTrap<T extends HTMLElement = HTMLElement>(
  node: null | T,
): void {
  const focusIndex = useRef(0);

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (node === null) return;
      if (!/tab/i.test(event.key)) return;

      event.preventDefault();

      const { activeElement } = document;
      const focusableElements = getFocusableElements(node);

      if (focusableElements.length === 0) return;

      const firstFocusable = focusableElements[0];
      const isForward = !event.shiftKey;

      if (
        !activeElement ||
        !isHTMLElement(activeElement) ||
        !node.contains(activeElement)
      ) {
        firstFocusable.focus();
        return;
      }

      const tabMovement = isForward ? 1 : -1;
      const nextFocusIndex =
        (focusIndex.current + tabMovement + focusableElements.length) %
        focusableElements.length;

      focusableElements[nextFocusIndex].focus();
      focusIndex.current = nextFocusIndex;
    }

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [node]);
}

const focusableElementSelector = `
button:not([disabled]),
input:not([disabled]):not([type="hidden"]),
select:not([disabled]),
textarea:not([disabled]),

[contenteditable],
[href],
[tabindex]:not([tabindex="-1"])`;

function getFocusableElements(element: HTMLElement) {
  return Array.from(element.querySelectorAll(focusableElementSelector)).filter(
    (el): el is Element & { focus: () => void } =>
      'focus' in el && typeof el.focus === 'function',
  );
}

function isHTMLElement(node: null | EventTarget): node is HTMLElement {
  return (
    node !== null && 'nodeType' in node && node.nodeType === Node.ELEMENT_NODE
  );
}
