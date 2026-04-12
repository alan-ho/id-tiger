# Weave Brand Extended - Carousel

This skill covers the Carousel component for creating scrollable content carousels.

## Carousel Component

The `Carousel` and `CarouselNavButtons` are distinct components linked by a ref.

**Structure:**
```tsx
const carouselRef = useRef<HTMLUListElement | null>(null);

<Box>
  <Carousel
    options={{ name: "Carousel Name", carouselRef }}
    track={{ sx: { paddingBlock: "35px", gap: 5 } }}
    liProps={{ sx: { width: "auto" } }}
  >
    {items.map(item => <Card key={item.id} {...item} />)}
  </Carousel>

  <CarouselNavButtons carouselRef={carouselRef} />
</Box>
```

**Slot Props:**
- `track`: Style the scrolling track.
- `liProps`: Style individual list items.
- `container`: Style the outer wrapper.

**Navigation Positioning:**
- Top: Place `CarouselNavButtons` before `Carousel`.
- Bottom: Place after.
- Absolute: Wrap in positioned container.
