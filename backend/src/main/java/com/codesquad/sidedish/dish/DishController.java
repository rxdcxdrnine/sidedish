package com.codesquad.sidedish.dish;

import com.codesquad.sidedish.dish.dto.DishResponse;
import com.codesquad.sidedish.dish.dto.Slice;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dishes")
@RequiredArgsConstructor
public class DishController {

    private final DishService dishService;

    @GetMapping
    public Slice<DishResponse> findDishes(
        @RequestParam(value = "section", required = false) String sectionName,
        @RequestParam(value = "category", required = false) String categoryName,
        @RequestParam(value = "festival", required = false) String festivalName,
        @RequestParam(value = "flat", required = false) Boolean flat
    ) {
        if (sectionName != null) {
            return dishService.findDishBySection(sectionName.replace("-", " "));
        }
        if (categoryName != null) {
            return dishService.findDishByCategory(categoryName.replace("-", " "));
        }
        return null;
    }
}
