/**
 * @function sanityBlockContent
 * @description Renders out a Sanity Block Content Node. Created as a
 * replacement to the Sanity team's "Portable Text" render libraries.
 * @param {HTMLElement} renderNode The node that will be modified with the
 * sanity block content
 * @param {Object[]} block The array of block data
 * @see https://github.com/portabletext/to-html/blob/main/package.json for a
 * library that is a more feature complete way to do this, and the library I
 * am replacing, since I don't want to use any dependencies.
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 4/15/25
 * @version 1.2.0
 */
function sanityBlockContent(renderNode, block) {
  renderNode.innerHTML = '';

  let isInList = false;
  let listParent = null;

  block?.forEach((item) => {
    if (item._type === 'block') {
      const style = item.style;
      const linkData = item.markDefs;
      const parentTag = (() => {
        if (item.listItem === 'bullet') {
          if (!isInList) {
            listParent = document.createElement('ul');
            renderNode.appendChild(listParent);
          }
          isInList = true;
          return 'li';
        }

        isInList = false;
        if (style === 'normal') {
          return 'p';
        }
        return style;
      })();
      const parent = document.createElement(parentTag);

      item.children.map((child) => {
        const text = child.text;
        if (child.marks.length && !child.marks.includes('em')) {
          // This is an anchor and needs attached to its data in the parent;
          const href = linkData.find(
            (item) => item._key === child.marks[0]
          )?.href;
          const link = document.createElement('a');
          link.href = href;
          link.innerText = text;
          parent.appendChild(link);
        } else {
          const isEm = child.marks.includes('em');
          const container = document.createElement(isEm ? 'em' : 'span');
          container.innerText = text;
          parent.appendChild(container);
        }
      });
      if (isInList) {
        listParent.appendChild(parent);
      } else {
        renderNode.appendChild(parent);
      }
    }
    if (item._type === 'image') {
      const image = document.createElement('img');
      image.src = item.asset.url;
      image.alt = item.alt;
      renderNode.appendChild(image);
    }
  });

  return renderNode;
}
